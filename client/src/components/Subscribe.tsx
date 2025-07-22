import React, { useState, ChangeEvent, FormEvent } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

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
    <div>
      <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
      <p className="text-amber-100 mb-4">
        Subscribe to our newsletter for book recommendations and exclusive
        offers!
      </p>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <input
          type="text"
          name="fullName"
          placeholder="Your Name"
          value={subscriptionData.fullName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={isLoading}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={subscriptionData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

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
    </div>
  );
};

export default Subscribe;
