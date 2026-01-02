"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useAuth } from "@/contexts/AuthContext";
import { ExternalLink, Github } from "lucide-react";

export const HeroParallax = ({
    products,
    header,
    projectHeader,
}: {
    products: {
        title: string;
        link?: string;
        thumbnail: string;
        description: string;
        tags: string[];
        github?: string;
    }[];
    header: React.ReactNode;
    projectHeader: React.ReactNode;
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 100, damping: 30, mass: 1 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );

    return (
        <div
            ref={ref}
            className="h-[400vh] py-10 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <div className="max-w-7xl relative mx-auto py-20 px-4 w-full left-0 top-0">
                {header}
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full mb-10 z-20 relative">
                {projectHeader}
            </div>

            <motion.div className="">
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-32">
                    {firstRow.map((product, idx) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={`${product.title}-${idx}`}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row mb-32 space-x-20 ">
                    {secondRow.map((product, idx) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={`${product.title}-${idx}`}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product, idx) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={`${product.title}-${idx}`}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        link?: string;
        thumbnail: string;
        description: string;
        tags: string[];
        github?: string;
    };
    translate: MotionValue<number>;
}) => {
    const { isAuthenticated, triggerAuth } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            className="group/product h-[40rem] w-[30rem] relative shrink-0"
        >
            <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
                <CardBody className={`relative group/card w-full h-full rounded-xl p-6 border transition-all duration-500 flex flex-col ${isOnline
                    ? 'bg-zinc-900/50 border-zinc-800 hover:border-brand-green/50 hover:shadow-2xl hover:shadow-brand-green/10'
                    : 'bg-zinc-900/30 border-red-900/50 hover:border-red-500/50'
                    }`}>

                    {/* Image - Highest Depth - POPUP EFFECT */}
                    <CardItem
                        translateZ="100"
                        className="w-full shrink-0"
                    >
                        <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-md group-hover/card:shadow-xl transition-all duration-300">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className={`h-full w-full object-cover transition-all duration-700 ${isOnline ? '' : 'grayscale sepia hue-rotate-[-20deg] saturate-150'
                                    }`}
                            />
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isOnline
                                ? 'bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent'
                                : 'bg-gradient-to-t from-zinc-950 via-red-950/30 to-transparent'
                                }`} />
                        </div>
                    </CardItem>

                    {/* Title - Depth 50 */}
                    <CardItem
                        translateZ="50"
                        as="h3"
                        className={`text-xl font-bold mt-8 mb-2 transition-colors duration-500 line-clamp-1 ${isOnline ? 'text-white' : 'text-red-100'
                            }`}
                    >
                        {product.title}
                    </CardItem>

                    {/* Description - Depth 60 */}
                    <CardItem
                        translateZ="60"
                        as="p"
                        className={`text-sm mb-6 line-clamp-2 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'
                            }`}
                    >
                        {product.description}
                    </CardItem>

                    {/* Tags - Depth 40 */}
                    <CardItem
                        translateZ="40"
                        className="flex flex-wrap gap-2 mt-auto"
                    >
                        {product.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-500 ${isOnline
                                    ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </CardItem>

                    {/* Links - Button Depth 20 - Wrapped in div for layout, items FLOAT */}
                    <div className="flex gap-4 mt-8 pt-6 border-t border-zinc-800/50">
                        {product.link && (
                            <CardItem
                                translateZ="20"
                                as="a"
                                href={isOnline ? product.link : "#"}
                                onClick={(e: React.MouseEvent) => {
                                    if (!isOnline) {
                                        e.preventDefault();
                                        triggerAuth();
                                    }
                                }}
                                className={`w-auto flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${isOnline
                                    ? 'text-brand-green hover:text-green-400'
                                    : 'text-red-400 hover:text-red-300'
                                    }`}
                            >
                                <ExternalLink size={16} />
                                <span className="text-white">View</span>
                            </CardItem>
                        )}
                        {product.github && (
                            <CardItem
                                translateZ="20"
                                as="a"
                                href={isOnline ? product.github : "#"}
                                onClick={(e: React.MouseEvent) => {
                                    if (!isOnline) {
                                        e.preventDefault();
                                        triggerAuth();
                                    }
                                }}
                                className={`w-auto flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${isOnline
                                    ? 'text-zinc-400 hover:text-white'
                                    : 'text-red-300/50 hover:text-red-200'
                                    }`}
                            >
                                <Github size={16} />
                                <span>Code</span>
                            </CardItem>
                        )}
                    </div>
                </CardBody>
            </CardContainer>
        </motion.div>
    );
};
