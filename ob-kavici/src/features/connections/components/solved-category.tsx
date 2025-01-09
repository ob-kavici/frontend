import React from "react";
import { motion } from "framer-motion";

type SolvedCategoryProps = {
    category: string;
    cards: string[]; // Array of card contents (strings)
    difficultyColor: string;
};

const SolvedCategory: React.FC<SolvedCategoryProps> = ({ category, cards, difficultyColor }) => (
    <motion.div
        key={category}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-2 overflow-hidden"
    >
        <div className={`rounded-lg p-4 ${difficultyColor}`}>
            <h3 className="font-bold text-center mb-1">{category}</h3>
            <p className="text-center text-sm">
                {cards.join(", ")}
            </p>
        </div>
    </motion.div>
);

export default SolvedCategory;
