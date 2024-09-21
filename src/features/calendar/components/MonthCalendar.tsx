"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import CalendarDay from "@/features/calendar/components/CalendarDay";
import { Select, SelectItem } from "@nextui-org/select";

export interface MonthCalendarProps {
    initialDate?: Date;
}

export default function MonthCalendar({ initialDate = new Date(), }: MonthCalendarProps) {
    const [selectedDate, setSelectedDate] = useState(initialDate);

    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();
    const currentDay = selectedDate.getDate();

    const initialDay = new Date(currentYear, currentMonth, 1);

    const startPadding = (initialDay.getDay() + 6) % 7;
    const monthDays: (number | null)[] = Array(startPadding).fill(null);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        monthDays.push(i);
    }

    const endPadding = 7 - (monthDays.length % 7);
    for (let i = 0; i < endPadding; i++) {
        monthDays.push(null);
    }

    const weeks = Array.from({ length: monthDays.length / 7 }).map((_, i) => monthDays.slice(i * 7, i * 7 + 7));

    const previousMonth = () => setSelectedDate(new Date(currentYear, currentMonth - 1, currentDay));
    const nextMonth = () => setSelectedDate(new Date(currentYear, currentMonth + 1, currentDay));

    return <div className="w-full flex flex-col items-stretch gap-4">
        <nav className="w-full flex items-center justify-between bg-content2 text-content2-foreground rounded-xl">
            <ButtonGroup>
                <Button isIconOnly onClick={previousMonth}><IconChevronLeft/></Button>
                <Select
                    variant="bordered"
                    radius="none"
                    fullWidth
                    className="min-w-24"
                    selectedKeys={[currentYear.toString()]}
                    selectionMode="single"
                    onChange={e => setSelectedDate(new Date(parseInt(e.target.value), currentMonth, currentDay))}
                    aria-label="Select Year"
                >
                    {[initialDate.getFullYear() - 1, initialDate.getFullYear(), initialDate.getFullYear() + 1].map(year =>
                        <SelectItem key={year.toString()}>
                            {year.toString()}
                        </SelectItem>)}
                </Select>
                <Select
                    variant="bordered"
                    radius="none"
                    fullWidth
                    className="min-w-32"
                    selectedKeys={[currentMonth.toString()]}
                    selectionMode="single"
                    onChange={e => setSelectedDate(new Date(currentYear, parseInt(e.target.value), currentDay))}
                    aria-label="Select Month"
                >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => <SelectItem key={month.toString()}>
                        {new Date(currentYear, month).toLocaleString('default', { month: 'long' })}
                    </SelectItem>)}
                </Select>
                <Button isIconOnly onClick={nextMonth}><IconChevronRight/></Button>
            </ButtonGroup>
        </nav>
        <table
            className="w-full h-full flex-grow bg-content2 text-content2-foreground rounded-xl border-separate border-spacing-0 table-fixed">
            <thead>
            <tr>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
            </tr>
            </thead>
            <tbody className="rounded-b-xl">
            {weeks.map((week, i) => <tr key={i} className="group">
                {week.map((day, j) => <td
                    key={j}
                    className="border-1 border-divider group-last:first:rounded-bl-xl group-last:last:rounded-br-xl p-0"
                >
                    {day && <CalendarDay
                        date={new Date(selectedDate.getFullYear(), currentMonth, day)}
                        selected={selectedDate?.getDate() === day}
                        onSelect={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                    />}
                </td>)}
            </tr>)}
            </tbody>
        </table>
    </div>
}