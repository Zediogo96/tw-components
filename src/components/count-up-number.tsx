import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
    end: number;
    duration?: number;
}

interface StatItemProps {
    label: string;
    value: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

const CountUp: FC<CountUpProps> = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '50px', // Preload animation slightly before visible
    });

    const updateCount = useCallback((timestamp: number, startTime: number | null = null) => {
        if (!startTime) return requestAnimationFrame((t) => updateCount(t, t));

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Cubic easing out - precalculated for better performance
        const easedProgress = progress < 1 ?
            1 - ((1 - progress) * (1 - progress) * (1 - progress)) :
            1;

        const speedMultiplier = end > 1000 ? 1.4 : 1;
        const targetValue = progress > 0.95 ? end :
            Math.min(Math.floor(easedProgress * end * speedMultiplier), end);

        setCount(targetValue);

        if (progress < 1) {
            return requestAnimationFrame((t) => updateCount(t, startTime));
        }
    }, [end, duration]);

    useEffect(() => {
        if (!inView) return;

        const frameId = requestAnimationFrame((timestamp) => updateCount(timestamp));

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [inView, updateCount]);

    return <span ref={ref}>{count}</span>;
};

const StatLabel: FC<{ children: React.ReactNode }> = ({ children }) => (
    <dt className="text-base leading-7 text-gray-600">
        {children}
    </dt>
);

const StatValue: FC<{ children: React.ReactNode }> = ({ children }) => (
    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] whitespace-nowrap">
        {children}
    </dd>
);

const StatItem: FC<StatItemProps> = ({ label, value, duration = 2, prefix = '', suffix = '' }) => (
    <div className="mx-auto flex max-w-xs flex-col gap-y-4 w-full">
        <StatLabel>{label}</StatLabel>
        <StatValue>
            {prefix}<CountUp end={value} duration={duration} />{suffix}
        </StatValue>
    </div>
);

const StatsNumberAnimation: FC = () => {
    const stats = useMemo(() => [
        {
            label: "Transactions every 24 hours",
            value: 44,
            suffix: " M"
        },
        {
            label: "Assets under holding",
            value: 119,
            prefix: "$",
            suffix: " T"
        },
        {
            label: "New users annually",
            value: 4600
        }
    ], []);

    return (
        <div className="bg-white shadow-2xl rounded-2xl py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-12 gap-y-16 text-center lg:grid-cols-3 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            label={stat.label}
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                        />
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default StatsNumberAnimation;
