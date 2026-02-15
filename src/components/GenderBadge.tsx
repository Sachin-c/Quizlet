import React from "react";
import { getGender, getArticle, getGenderLabel, getGenderColor } from "../utils/genderData";

interface GenderBadgeProps {
  frenchWord: string;
  showArticle?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Displays a color-coded gender badge for French nouns.
 * Blue = masculine (le), Pink = feminine (la), Purple = m/f, Amber = plural
 */
export const GenderBadge: React.FC<GenderBadgeProps> = ({
  frenchWord,
  showArticle = true,
  size = "sm",
  className = "",
}) => {
  const gender = getGender(frenchWord);
  if (!gender) return null; // Not a noun or gender unknown

  const label = getGenderLabel(frenchWord);
  const article = getArticle(frenchWord, "definite");
  const colors = getGenderColor(frenchWord);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold border transition-all ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses[size]} ${className}`}
      title={`Gender: ${gender === "m" ? "masculine" : gender === "f" ? "feminine" : gender === "pl" ? "plural" : "masculine/feminine"} — ${article} ${frenchWord}`}
    >
      {/* Gender icon */}
      <span className="opacity-80">
        {gender === "m" ? "♂" : gender === "f" ? "♀" : gender === "pl" ? "⊕" : "♂♀"}
      </span>

      {/* Article */}
      {showArticle && article && (
        <span className="font-black">{article}</span>
      )}

      {/* Label */}
      {!showArticle && label && (
        <span>{label}</span>
      )}
    </span>
  );
};

/**
 * Inline gender indicator - minimal, just shows the article before the word.
 */
export const InlineGender: React.FC<{ frenchWord: string; className?: string }> = ({
  frenchWord,
  className = "",
}) => {
  const gender = getGender(frenchWord);
  if (!gender) return null;

  const article = getArticle(frenchWord, "definite");
  const colors = getGenderColor(frenchWord);

  return (
    <span className={`${colors.text} font-semibold ${className}`}>
      {article}{" "}
    </span>
  );
};
