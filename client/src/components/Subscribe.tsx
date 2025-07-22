import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

type SubscriptionStatus = "success" | "error" | null;

const Subscribe: React.FC = () => {
  const [subscriptionData, setSubscriptionData] = useState<{
    fullName: string;
    email: string;
  }>({
    fullName: "",
    email: "",
  });

  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubscriptionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();

    if (!subscriptionData.fullName.trim() || !subscriptionData.email.trim()) {
      setSubscriptionStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriptionData.email)) {
      setSubscriptionStatus("error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://global-crm-1zi3.vercel.app/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: subscriptionData.fullName,
            email: subscriptionData.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Subscription failed");

      setSubscriptionStatus("success");
      setSubscriptionData({ fullName: "", email: "" });
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscriptionStatus("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSubscriptionStatus(null), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="relative my-40 bg-white text-black flex flex-col md:flex-row items-center justify-center px-6 md:px-24 overflow-hidden"
    >
      <motion.div
        className="w-full md:w-1/2 mb-12 md:mb-0"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="max-w-md">
          <div className="mb-10">
            <img
              src="/newsletter.jpg"
              alt="landotravels Logo"
              width={300}
              height={150}
              className="object-contain"
            />
          </div>
          <h2 className="text-4xl mb-4 font-bold">Stay Updated</h2>
          <p className="text-gray-400">
            Subscribe to our newsletter for book recommendations and exclusive
            offers!
          </p>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubscribe}
        className="space-y-10 my-10 max-w-xl "
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <label htmlFor="label" className="text-sm text-gray-400  mb-1">
          Your Name
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="Someone"
          value={subscriptionData.fullName}
          onChange={handleInputChange}
          className="rounded w-full bg-transparent border-b border-blue-500 focus:outline-none focus:border-b-2 focus:border-blue-500 transition"
          disabled={isLoading}
        />

        <label htmlFor="label" className="text-sm text-gray-400  mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={subscriptionData.email}
          onChange={handleInputChange}
          className="rounded w-full bg-transparent border-b border-blue-500 focus:outline-none focus:border-b-2 focus:border-blue-500 transition"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white text-sm cursor-pointer font-medium px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            "Subscribe"
          )}
        </button>
      </motion.form>

      {subscriptionStatus === "success" && (
        <div className="mt-3 flex items-center text-green-300">
          <CheckCircle size={16} className="mr-2" />
          <span className="text-sm">You are subscribed 🎉</span>
        </div>
      )}

      {subscriptionStatus === "error" && (
        <div className="mt-3 flex items-center text-red-300">
          <AlertCircle size={16} className="mr-2" />
          <span className="text-sm">
            Please check your information and try again.
          </span>
        </div>
      )}
    </section>
  );
};

export default Subscribe;
