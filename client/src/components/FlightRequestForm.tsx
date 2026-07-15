import React, { useState } from "react";
import { motion } from "framer-motion";
import AsyncSelect from "react-select/async";
import axios from "axios";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";

type AirportOption = {
    label: string;
    value: string;
};

type TravellerKey = "adults" | "children" | "infants";
type LuggageKey = "carryon" | "checked" | "extra";

const FlightRequestForm: React.FC = () => {
    const [tripType, setTripType] = useState("Round Trip");
    const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);
    const [form, setForm] = useState({
        origin: "",
        destination: "",
        depart: "",
        return: "",
        travellers: "",
        travelClass: "Economy",
        name: "",
        email: "",
        phone: "",
        address: "",
        decription: "",
        adults: 1,
        children: 0,
        infants: 0,
        // Passport Details
        passportNumber: "",
        passportExpiry: "",
        nationality: "",
        // Luggage Selection
        carryon: 1,
        checked: 1,
        extra: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [multiCityFlights, setMultiCityFlights] = useState([
        { origin: "", destination: "", depart: "" },
        { origin: "", destination: "", depart: "" },
    ]);

    const addFlightLeg = () => {
        if (multiCityFlights.length < 6) {
            setMultiCityFlights([
                ...multiCityFlights,
                { origin: "", destination: "", depart: "" },
            ]);
        } else {
            toast.error("You can only add up to 6 flights.");
        }
    };

    const fetchAirports = async (query: string) => {
        const res = await fetch("/airports.json");
        const data = await res.json();
        const airports = Object.values(data);

        return airports
            .filter((airport: any) =>
                `${airport.name} ${airport.city} ${airport.country} ${airport.iata}`.toLowerCase().includes(query.toLowerCase())
            )
            .map((airport: any) => ({
                label: `${airport.name}, ${airport.city} (${airport.iata})`,
                value: airport.iata,
            }));
    };

    const debouncedFetchAirports = debounce(async (input: string, callback: (options: AirportOption[]) => void) => {
        const results = await fetchAirports(input);
        const mapped = results.map((a: AirportOption) => ({
            label: a.label,
            value: a.value,
        }));
        callback(mapped);
    }, 400); // 400ms delay

    const loadAirportOptions = (inputValue: string, callback: (options: AirportOption[]) => void) => {
        debouncedFetchAirports(inputValue, callback);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = (): boolean => {
        // Validate origin and destination
        if (!form.origin || !form.destination) {
            toast.error("Please select origin and destination airports");
            return false;
        }

        // Validate departure date
        if (!form.depart) {
            toast.error("Please select a departure date");
            return false;
        }

        // Validate return date for round trips
        if (tripType === "Round Trip" && !form.return) {
            toast.error("Please select a return date");
            return false;
        }

        // Validate at least 1 adult is traveling
        if (form.adults < 1) {
            toast.error("At least 1 adult must be traveling");
            return false;
        }

        // Validate passport expiry is in the future
        if (!form.passportExpiry) {
            toast.error("Please enter passport expiry date");
            return false;
        }

        const expiryDate = new Date(form.passportExpiry);
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

        if (expiryDate < sixMonthsFromNow) {
            toast.error("Passport must be valid for at least 6 months");
            return false;
        }

        // Validate passport number and nationality
        if (!form.passportNumber.trim()) {
            toast.error("Please enter your passport number");
            return false;
        }

        if (!form.nationality.trim()) {
            toast.error("Please enter your nationality");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const logoBase64 = await new Promise<string>((resolve) => {
                const img = new Image();
                img.src = "/logo.webp";
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext("2d")?.drawImage(img, 0, 0);
                    const dataUrl = canvas.toDataURL("image/png");
                    resolve(dataUrl);
                };
            });

            await axios.post("https://lando-travels.vercel.app/flight/sendFlightRequest", {
                ...form,
                returnDate: form.return,
                tripType,
                logoBase64,
                multiCityFlights,
                passportDetails: {
                    passportNumber: form.passportNumber,
                    passportExpiry: form.passportExpiry,
                    nationality: form.nationality,
                },
                luggageSelection: {
                    carryon: form.carryon,
                    checked: form.checked,
                    extra: form.extra,
                },
            });

            toast.success("Flight request submitted successfully!");

            // Reset form
            setForm({
                origin: "",
                destination: "",
                depart: "",
                return: "",
                travellers: "",
                travelClass: "Economy",
                name: "",
                email: "",
                phone: "",
                address: "",
                decription: "",
                adults: 1,
                children: 0,
                infants: 0,
                passportNumber: "",
                passportExpiry: "",
                nationality: "",
                carryon: 1,
                checked: 1,
                extra: 0,
            });

            // Reset traveller dropdown
            setShowTravellerDropdown(false);

            // Reset multi-city flights to initial state
            setMultiCityFlights([
                { origin: "", destination: "", depart: "" },
                { origin: "", destination: "", depart: "" },
            ]);

            // Reset trip type
            setTripType("Round Trip");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-16 px-4 md:px-10 text-black"
        >
            <div className="max-w-5xl mx-auto">
                {/* Trip Type Toggle */}
                <div className="flex justify-center space-x-3 mb-8">
                    {["One Way", "Round Trip", "Multi City"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setTripType(type)}
                            className={`cursor-pointer px-5 py-2 rounded-lg text-sm font-semibold border transition ${tripType === type
                                ? "bg-blue-500 text-white"
                                : "border-gray-400 text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-md space-y-10"
                >
                    <div id="pdf-content" className="space-y-8">
                        <h2 className="text-xl font-semibold text-center text-gray-800">
                            Flight Request Details
                        </h2>

                        {tripType === "Multi City" && (
                            <div className="space-y-4">
                                {multiCityFlights.map((flight, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end relative"
                                    >
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1">Origin</label>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={loadAirportOptions}
                                                required
                                                onChange={(selected) =>
                                                    setMultiCityFlights((prev) =>
                                                        prev.map((f, i) =>
                                                            i === index ? { ...f, origin: selected?.label || "" } : f
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1">Destination</label>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                required
                                                loadOptions={loadAirportOptions}
                                                onChange={(selected) =>
                                                    setMultiCityFlights((prev) =>
                                                        prev.map((f, i) =>
                                                            i === index ? { ...f, destination: selected?.label || "" } : f
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                                            <input
                                                required
                                                type="date"
                                                value={flight.depart}
                                                min={new Date().toISOString().split("T")[0]}
                                                onChange={(e) =>
                                                    setMultiCityFlights((prev) =>
                                                        prev.map((f, i) =>
                                                            i === index ? { ...f, depart: e.target.value } : f
                                                        )
                                                    )
                                                }
                                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none text-gray-800"
                                            />
                                        </div>

                                        {/* Remove flight button */}
                                        {multiCityFlights.length > 2 && index > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMultiCityFlights((prev) => prev.filter((_, i) => i !== index))
                                                }
                                                className="absolute -top-2 -right-2 cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 text-xs px-2 py-1 rounded-full"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {/* Add More Flights */}
                                <div className="flex justify-end pt-2">
                                    <button
                                        type="button"
                                        onClick={addFlightLeg}
                                        className="text-blue-500 text-sm font-medium cursor-pointer flex items-center"
                                    >
                                        <span className="text-lg mr-1">＋</span>{" "}
                                        <span className="hover:underline">Add another flight</span>
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {tripType !== "Multi City" && (
                                <>
                                    <div className="flex flex-col relative">
                                        <label htmlFor="origin" className="text-sm font-medium text-gray-700 mb-1">
                                            Origin <span className="text-red-500">*</span>
                                        </label>
                                        <AsyncSelect
                                            inputId="origin"
                                            cacheOptions
                                            defaultOptions
                                            loadOptions={loadAirportOptions}
                                            onChange={(selected: AirportOption | null) =>
                                                setForm({ ...form, origin: selected?.label || "" })
                                            }
                                            isClearable
                                        />
                                    </div>
                                    <div className="flex flex-col relative">
                                        <label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-1">
                                            Destination <span className="text-red-500">*</span>
                                        </label>
                                        <AsyncSelect
                                            inputId="destination"
                                            cacheOptions
                                            defaultOptions
                                            loadOptions={loadAirportOptions}
                                            onChange={(selected: AirportOption | null) =>
                                                setForm({ ...form, destination: selected?.label || "" })
                                            }
                                            isClearable
                                        />
                                    </div>
                                    <div className="flex flex-col relative">
                                        <label htmlFor="depart" className="text-sm font-medium text-gray-700 mb-1">
                                            Departure Date
                                        </label>
                                        <input
                                            id="depart"
                                            required
                                            name="depart"
                                            type="date"
                                            value={form.depart}
                                            min={new Date().toISOString().split("T")[0]}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                        />
                                    </div>

                                    {tripType === "Round Trip" && (
                                        <div className="flex flex-col relative">
                                            <label htmlFor="return" className="text-sm font-medium text-gray-700 mb-1">
                                                Return Date
                                            </label>
                                            <input
                                                id="return"
                                                required
                                                name="return"
                                                type="date"
                                                value={form.return}
                                                min={form.depart || new Date().toISOString().split("T")[0]}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="flex flex-col relative">
                                <label className="text-sm font-medium text-gray-700 mb-1">Travellers</label>

                                <div className="relative">
                                    <input
                                        required
                                        readOnly
                                        onClick={() => setShowTravellerDropdown(!showTravellerDropdown)}
                                        value={`${form.adults} Adult(s), ${form.children} Child, ${form.infants} Infant`}
                                        className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none cursor-pointer"
                                    />

                                    {showTravellerDropdown && (
                                        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md p-4 space-y-3">
                                            {([
                                                { label: "Adults", key: "adults" },
                                                { label: "Child (2–11 YRS)", key: "children" },
                                                { label: "Infant (Below 2 YRS)", key: "infants" },
                                            ] as { label: string; key: TravellerKey }[]).map(({ label, key }) => (
                                                <div key={key} className="flex justify-between items-center">
                                                    <span className="text-gray-700">{label}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setForm((prev) => ({
                                                                    ...prev,
                                                                    [key]: key === "adults" ? Math.max(1, Number(prev[key]) - 1) : Math.max(0, Number(prev[key]) - 1),
                                                                }))
                                                            }
                                                            className="w-8 h-8 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-6 text-center">{form[key]}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setForm((prev) => ({
                                                                    ...prev,
                                                                    [key]: Number(prev[key]) + 1,
                                                                }))
                                                            }
                                                            className="w-8 h-8 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col relative">
                                <label htmlFor="travelClass" className="text-sm font-medium text-gray-700 mb-1">
                                    Travel Class
                                </label>
                                <select
                                    id="travelClass"
                                    name="travelClass"
                                    value={form.travelClass}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                >
                                    <option>Economy</option>
                                    <option>Premium Economy</option>
                                    <option>Business</option>
                                    <option>First Class</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col relative">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
                                Additional Details
                            </label>
                            <textarea
                                id="description"
                                name="decription"
                                placeholder="Layover, Direct flights, Baggage..."
                                value={form.decription}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                            />
                        </div>

                        <hr className="border-t border-gray-200" />

                        {/* Luggage Variety Selection */}
                        <h2 className="text-xl font-semibold text-center text-gray-800">
                            Luggage Selection
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-3">Carry-On Bags</label>
                                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-300">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                carryon: Math.max(0, Number(prev.carryon) - 1),
                                            }))
                                        }
                                        className="w-8 h-8 cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg flex items-center justify-center"
                                    >
                                        −
                                    </button>
                                    <span className="text-xl font-semibold text-gray-800">{form.carryon}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                carryon: Math.min(2, Number(prev.carryon) + 1),
                                            }))
                                        }
                                        className="w-8 h-8 cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Max: 2 bags</p>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-3">Checked Baggage</label>
                                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-300">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                checked: Math.max(0, Number(prev.checked) - 1),
                                            }))
                                        }
                                        className="w-8 h-8 cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg flex items-center justify-center"
                                    >
                                        −
                                    </button>
                                    <span className="text-xl font-semibold text-gray-800">{form.checked}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                checked: Math.min(3, Number(prev.checked) + 1),
                                            }))
                                        }
                                        className="w-8 h-8 cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Max: 3 bags (23 kg each)</p>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-3">Extra Baggage</label>
                                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-300">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                extra: Math.max(0, Number(prev.extra) - 1),
                                            }))
                                        }
                                        className="w-8 h-8 cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg flex items-center justify-center"
                                    >
                                        −
                                    </button>
                                    <span className="text-xl font-semibold text-gray-800">{form.extra}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                extra: Math.min(2, Number(prev.extra) + 1),
                                            }))
                                        }
                                        className="w-8 h-8 cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Max: 2 bags @ $50 each</p>
                            </div>
                        </div>

                        <hr className="border-t border-gray-200" />

                        {/* Passport Details Section */}
                        <h2 className="text-xl font-semibold text-center text-gray-800">
                            Passport & Travel Documents
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Passport Number
                                </label>
                                <input
                                    required
                                    name="passportNumber"
                                    placeholder="e.g., A12345678"
                                    value={form.passportNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none uppercase"
                                    maxLength={20}
                                />
                                <p className="text-xs text-gray-500 mt-1">As shown in passport</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Passport Expiry Date
                                </label>
                                <input
                                    required
                                    name="passportExpiry"
                                    type="date"
                                    value={form.passportExpiry}
                                    min={(() => {
                                        const sixMonthsFromNow = new Date();
                                        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
                                        return sixMonthsFromNow.toISOString().split("T")[0];
                                    })()}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">Must be valid for at least 6 months from today</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Nationality
                                </label>
                                <input
                                    required
                                    name="nationality"
                                    placeholder="e.g., Indian"
                                    value={form.nationality}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">Your country of citizenship</p>
                            </div>
                        </div>

                        <hr className="border-t border-gray-200" />

                        <h2 className="text-xl font-semibold text-center text-gray-800">
                            Contact Information
                        </h2>

                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col relative">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        required
                                        name="name"
                                        placeholder="Example Name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col relative">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        required
                                        name="email"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col relative">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
                                        Phone  Number
                                    </label>
                                    <input
                                        id="phone"
                                        required
                                        name="phone"
                                        placeholder="+94xxxxxxx"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col relative">
                                    <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        required
                                        name="address"
                                        placeholder="No123 Colombo..."
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`cursor-pointer px-6 py-3 rounded-lg text-sm font-medium transition ${isSubmitting
                                ? "bg-blue-300 text-white cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                        >
                            {isSubmitting ? "Sending..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </motion.section>
    );
};

export default FlightRequestForm;