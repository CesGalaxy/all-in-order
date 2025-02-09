"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { IconCalendarEvent, IconCalendarPlus, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import CalendarDay from "@/features/calendar/components/CalendarDay";
import { Select, SelectItem } from "@heroui/select";
import TodoInfo from "@/components/dev/TodoInfo";
import { AnimatePresence, motion } from "framer-motion";
import { useDisclosure } from "@heroui/modal";
import { Drawer } from "@heroui/drawer";
import CreateSubjectEventDrawer from "@/collections/subjectEvent/components/modals/CreateSubjectEventDrawer";

export interface MonthCalendarProps {
    initialDate?: Date;
    subjectId: number;
}

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function MonthCalendar({ initialDate = new Date(), subjectId }: MonthCalendarProps) {
    // FIXME: Linter error
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedDate, setSelectedDate] = useState(initialDate);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [direction, setDirection] = useState<1 | -1>(1);

    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();
    const currentDay = selectedDate.getDate();

    const initialDay = new Date(currentYear, currentMonth, 1);

    const startPadding = (initialDay.getDay() + 6) % 7;
    const monthDays: (number | null)[] = Array(startPadding).fill(null);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) monthDays.push(i);

    const endPadding = 7 - (monthDays.length % 7);
    for (let i = 0; i < endPadding; i++) monthDays.push(null);

    const weeks = Array.from({ length: monthDays.length / 7 }).map((_, i) => monthDays.slice(i * 7, i * 7 + 7));

    const previousMonth = () => {
        setSelectedDate(new Date(currentYear, currentMonth - 1, currentDay));
        setDirection(-1);
    };

    const nextMonth = () => {
        setSelectedDate(new Date(currentYear, currentMonth + 1, currentDay));
        setDirection(1);
    };

    const createDisclosure = useDisclosure();

    return <div className="w-full flex flex-col items-stretch gap-4">
        <Drawer isOpen={createDisclosure.isOpen} onOpenChange={createDisclosure.onOpenChange}>
            <CreateSubjectEventDrawer/>
        </Drawer>
        <nav
            className="w-full flex items-center justify-between bg-content2 text-content2-foreground rounded-xl flex-wrap gap-2">
            <ButtonGroup>
                <Button isIconOnly onPress={previousMonth}><IconChevronLeft/></Button>
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
                <Button isIconOnly onPress={nextMonth}><IconChevronRight/></Button>
            </ButtonGroup>
            <ul className="flex items-center gap-4">
                <li>
                    <Button isIconOnly><IconCalendarEvent/></Button>
                </li>
                <li>
                    <Button color="primary" startContent={<IconCalendarPlus/>} onPress={createDisclosure.onOpen}>
                        Add event
                    </Button>
                </li>
            </ul>
        </nav>
        <div className="relative overflow-x-clip">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentMonth}
                    className="w-full flex-grow bg-content2 text-content2-foreground rounded-xl absolute"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            nextMonth();
                        } else if (swipe > swipeConfidenceThreshold) {
                            previousMonth();
                        }
                    }}
                >
                    <table className="w-full rounded-xl border-separate border-spacing-0 table-fixed">
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
                        <tbody className="rounded-b-xl rounded-t-xl">
                        {weeks.map((week, i) => <tr key={i} className="group/tr">
                            {week.map((day, j) => <td
                                key={j}
                                className="border-1 border-divider group-last/tr:first:rounded-bl-xl group-last/tr:last:rounded-br-xl group-first/tr:first:rounded-tl-xl group-first/tr:last:rounded-tr-xl group/td p-0"
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
                    <TodoInfo>Events go here</TodoInfo>
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
}