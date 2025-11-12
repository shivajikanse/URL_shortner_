import { useState } from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";

export default function URLForm({ onSubmit, isLoading }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    onSubmit(url);
    setUrl("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <motion.div
        className="bg-card/50 backdrop-blur-md border border-primary/30 rounded-xl p-6 shadow-2xl hover:shadow-2xl transition-all duration-300 mt-20"
        animate={{
          boxShadow: focused
            ? "0 0 40px rgba(147, 51, 234, 0.3), 0 0 80px rgba(96, 165, 250, 0.1)"
            : "0 0 20px rgba(147, 51, 234, 0.1)",
        }}
      >
        <label
          htmlFor="url"
          className="block text-sm font-medium mb-3 text-foreground"
        >
          Enter your long URL
        </label>

        <div className="relative mb-4">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg opacity-0 blur"
            animate={{
              opacity: focused ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="https://example.com/very/long/url/path"
            disabled={isLoading}
            className="relative w-full px-4 py-3 bg-background/80 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all duration-200 disabled:opacity-50 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm mb-4"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="relative w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <span className="relative flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader />
                Shortening...
              </>
            ) : (
              "Shorten URL"
            )}
          </span>
        </motion.button>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Your URLs are processed securely and instantly
        </p>
      </motion.div>
    </motion.form>
  );
}
