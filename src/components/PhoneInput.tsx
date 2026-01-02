"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Popular countries with their codes and flags
const countries = [
    { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
    { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
    { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦" },
    { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
    { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳" },
    { code: "BR", dialCode: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "RU", dialCode: "+7", name: "Russia", flag: "🇷🇺" },
    { code: "AE", dialCode: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "SG", dialCode: "+65", name: "Singapore", flag: "🇸🇬" },
    { code: "NL", dialCode: "+31", name: "Netherlands", flag: "🇳🇱" },
    { code: "IT", dialCode: "+39", name: "Italy", flag: "🇮🇹" },
    { code: "ES", dialCode: "+34", name: "Spain", flag: "🇪🇸" },
    { code: "MX", dialCode: "+52", name: "Mexico", flag: "🇲🇽" },
    { code: "KR", dialCode: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "SA", dialCode: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "ZA", dialCode: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "NZ", dialCode: "+64", name: "New Zealand", flag: "🇳🇿" },
    { code: "SE", dialCode: "+46", name: "Sweden", flag: "🇸🇪" },
    { code: "CH", dialCode: "+41", name: "Switzerland", flag: "🇨🇭" },
    { code: "PK", dialCode: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "BD", dialCode: "+880", name: "Bangladesh", flag: "🇧🇩" },
];

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export default function PhoneInput({ value, onChange, placeholder = "Enter phone number", className, disabled }: PhoneInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to India
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Extract phone number without country code
    const phoneNumber = value.startsWith(selectedCountry.dialCode)
        ? value.slice(selectedCountry.dialCode.length).trim()
        : value.replace(/^\+\d+\s*/, "");

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Parse initial value to detect country
    useEffect(() => {
        if (value) {
            const matchingCountry = countries.find(c => value.startsWith(c.dialCode));
            if (matchingCountry) {
                setSelectedCountry(matchingCountry);
            }
        }
    }, [value]);

    const filteredCountries = countries.filter(
        (country) =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            country.dialCode.includes(searchQuery) ||
            country.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCountrySelect = (country: typeof countries[0]) => {
        if (disabled) return; // Prevent selection if disabled
        setSelectedCountry(country);
        setIsOpen(false);
        setSearchQuery("");
        onChange(`${country.dialCode} ${phoneNumber}`);
        inputRef.current?.focus();
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const input = e.target.value.replace(/[^\d]/g, ""); // Only digits
        if (input.length <= 10) {
            onChange(`${selectedCountry.dialCode} ${input}`);
        }
    };

    return (
        <div className={`relative ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`} ref={dropdownRef}>
            <div className="flex rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden focus-within:border-brand-green focus-within:ring-1 focus-within:ring-brand-green/20 transition-all">
                {/* Country Selector */}
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className="flex items-center gap-1.5 px-3 py-3 bg-zinc-900/50 border-r border-zinc-800 hover:bg-zinc-800/50 transition-colors min-w-[90px] disabled:cursor-not-allowed"
                    disabled={disabled}
                >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-zinc-300">{selectedCountry.dialCode}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Phone Input */}
                <input
                    ref={inputRef}
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={placeholder}
                    maxLength={10}
                    disabled={disabled}
                    className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none disabled:cursor-not-allowed"
                />
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-72 max-h-72 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl z-50"
                    >
                        {/* Search */}
                        <div className="p-2 border-b border-zinc-800">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search country..."
                                    className="w-full rounded-lg bg-zinc-900 border border-zinc-800 pl-9 pr-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Country List */}
                        <div className="max-h-52 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                    <button
                                        key={country.code}
                                        onClick={() => handleCountrySelect(country)}
                                        className={`flex items-center gap-3 w-full px-4 py-2.5 hover:bg-zinc-900 transition-colors ${selectedCountry.code === country.code ? "bg-zinc-900/70" : ""
                                            }`}
                                    >
                                        <span className="text-xl">{country.flag}</span>
                                        <span className="text-sm text-white flex-1 text-left">{country.name}</span>
                                        <span className="text-sm text-zinc-500">{country.dialCode}</span>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-sm text-zinc-500">
                                    No countries found
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
