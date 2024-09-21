"use client";

export const DAY_COLORS = {
    default: "bg-content3 text-content3-foreground",
    selected: "bg-primary text-primary-foreground",
    today: "bg-primary-200 text-foreground",
}

export interface CalendarDayProps {
    date: Date;
    selected?: boolean;
    onSelect?: () => void;
}

export default function CalendarDay({ date, selected, onSelect }: CalendarDayProps) {
    const todayNumber = new Date().getDate();
    const isToday = date.getDate() === todayNumber;

    const color = selected ? DAY_COLORS.selected : (isToday ? DAY_COLORS.today : DAY_COLORS.default);

    return <section className="w-full min-h-24 --h-[10vh] flex flex-col items-stretch justify-stretch m-0 p-0"
                    onClick={onSelect}>
        <header
            className={`${color} px-1 font-bold font-mono cursor-pointer`}>
            {date.getDate()}
        </header>
        <ul className="w-full h-full flex-grow">
            <li>hello</li>
        </ul>
    </section>
}