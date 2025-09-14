"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type Task = {
    id: string;
    name: string;
    icon: React.ReactNode;
    component: React.ReactNode;
};

type TaskContextType = {
    tasks: Task[];
    currentTask: Task | null;
    currentTaskId: string | null;
    setCurrentTaskId: (id: string | null) => void;
    openTask: (task: Task) => void;
    toggleTask: (id: string) => void;
    closeTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

    const openTask = useCallback((task: Omit<Task, "visible">) => {
        setTasks((prev) => (prev.find((t) => t.id === task.id)) ? prev : [...prev, task]);
        setCurrentTaskId(task.id);
    }, []);

    const toggleTask = useCallback((id: string) => setCurrentTaskId((prev) => (prev === id ? "" : id)), []);

    const closeTask = useCallback((id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setCurrentTaskId(null);
    }, []);

    const currentTask = useMemo(() => (currentTaskId && tasks.find(t => t.id === currentTaskId)) || null, [currentTaskId, tasks]);

    return (
        <TaskContext.Provider value={{ tasks, currentTask, currentTaskId, setCurrentTaskId, openTask, toggleTask, closeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
    return ctx;
};
