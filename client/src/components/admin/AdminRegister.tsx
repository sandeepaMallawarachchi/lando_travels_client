import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminRegister: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\d{10}$/;

    const validateField = (name: string, value: string) => {
        const newErrors = { ...errors };
        switch (name) {
            case 'firstname':
                newErrors.firstname = nameRegex.test(value) ? '' : 'First name should contain only letters.';
                break;
            case 'lastname':
                newErrors.lastname = nameRegex.test(value) ? '' : 'Last name should contain only letters.';
                break;
            case 'email':
                newErrors.email = value.includes('@') ? '' : 'Invalid email format.';
                break;
            case 'password':
                newErrors.password = passwordRegex.test(value) ? '' : 'Password must include uppercase, lowercase, number, special char.';
                break;
            case 'confirmPassword':
                newErrors.confirmPassword = value === password ? '' : 'Passwords do not match.';
                break;
            case 'phone':
                newErrors.phone = phoneRegex.test(value) ? '' : 'Phone must be 10 digits.';
                break;
        }
        setErrors(newErrors);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstname': setFirstname(value); break;
            case 'lastname': setLastname(value); break;
            case 'email': setEmail(value); break;
            case 'password': setPassword(value); break;
            case 'confirmPassword': setConfirmPassword(value); break;
            case 'gender': setGender(value); break;
            case 'role': setRole(value); break;
            case 'address': setAddress(value); break;
            case 'phone': setPhone(value); break;
        }
        validateField(name, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(errors).some((err) => err)) return;

        try {
            const res = await axios.post('https://lando-travels-api.vercel.app/admin/register', {
                firstname, lastname, email, password, confirmPassword, gender, role, address, phone,
            });
            if (res.status === 201) {
                toast.success('Admin created successfully');
                setFirstname(''); setLastname(''); setEmail(''); setPassword(''); setConfirmPassword('');
                setGender(''); setRole(''); setAddress(''); setPhone(''); setErrors({});
            }
        } catch (err: any) {
            toast.error('Error adding Admin!');
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Admin Registration</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { name: 'firstname', placeholder: 'Enter first name' },
                        { name: 'lastname', placeholder: 'Enter last name' },
                        { name: 'email', placeholder: 'example@mail.com' },
                        { name: 'phone', placeholder: '0712345678' },
                        { name: 'password', placeholder: 'Create password' },
                        { name: 'confirmPassword', placeholder: 'Confirm password' },
                    ].map(({ name, placeholder }, idx) => (
                        <div key={idx}>
                            <label className="block mb-1 capitalize text-sm font-medium text-gray-700" htmlFor={name}>
                                {name.replace(/([A-Z])/g, ' $1')}
                            </label>
                            <input
                                type={name.toLowerCase().includes('password') ? 'password' : 'text'}
                                id={name}
                                name={name}
                                placeholder={placeholder}
                                value={eval(name)}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
                        <div className="flex gap-4">
                            {['male', 'female'].map((g) => (
                                <label key={g} className="flex items-center gap-2">
                                    <input type="radio" name="gender" value={g} checked={gender === g} onChange={handleChange} /> {g}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
                        <div className="flex gap-4">
                            {['owner', 'editor'].map((r) => (
                                <label key={r} className="flex items-center gap-2">
                                    <input type="radio" name="role" value={r} checked={role === r} onChange={handleChange} /> {r}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
                    <textarea
                        name="address"
                        placeholder="Colombo, Sri Lanka"
                        value={address}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                </div>

                <div className='flex justify-center'>
                    <button aria-label="Button" type="submit" className="w-1/2 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminRegister;