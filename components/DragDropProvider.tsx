"use client";

import React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  defaultDropAnimationSideEffects,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Activity } from "@/lib/types";
import ActivityCard from "./ActivityCard";

interface DragDropProviderProps {
  children: React.ReactNode;
  saturdayActivities: Activity[];
  sundayActivities: Activity[];
  onReorderActivities: (
    day: "saturday" | "sunday",
    activities: Activity[],
  ) => void;
  onMoveActivity: (
    activityId: string,
    fromDay: "saturday" | "sunday",
    toDay: "saturday" | "sunday",
    newIndex?: number,
  ) => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string, day: "saturday" | "sunday") => void;
  onCompleteActivity: (id: string, day: "saturday" | "sunday") => void;
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

export default function DragDropProvider({
  children,
  saturdayActivities,
  sundayActivities,
  onReorderActivities,
  onMoveActivity,
  onEditActivity,
  onDeleteActivity,
  onCompleteActivity,
}: DragDropProviderProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: string): "saturday" | "sunday" | null => {
    if (saturdayActivities.find((activity) => activity.id === id)) {
      return "saturday";
    }
    if (sundayActivities.find((activity) => activity.id === id)) {
      return "sunday";
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id as string;

    setActiveId(activeId);

    // Find the active activity
    const activity = [...saturdayActivities, ...sundayActivities].find(
      (act) => act.id === activeId,
    );
    setActiveActivity(activity || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = findContainer(activeId);
    const overContainer =
      findContainer(overId) || (overId as "saturday" | "sunday");

    if (!activeContainer || activeContainer === overContainer) {
      return;
    }

    // Move activity between days
    onMoveActivity(activeId, activeContainer, overContainer);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setActiveActivity(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = findContainer(activeId);
    const overContainer =
      findContainer(overId) || (overId as "saturday" | "sunday");

    if (!activeContainer) {
      setActiveId(null);
      setActiveActivity(null);
      return;
    }

    if (activeContainer === overContainer) {
      // Reorder within the same day
      const activities =
        activeContainer === "saturday" ? saturdayActivities : sundayActivities;
      const oldIndex = activities.findIndex(
        (activity) => activity.id === activeId,
      );
      const newIndex = activities.findIndex(
        (activity) => activity.id === overId,
      );

      if (oldIndex !== newIndex) {
        const reorderedActivities = arrayMove(activities, oldIndex, newIndex);
        onReorderActivities(activeContainer, reorderedActivities);
      }
    }

    setActiveId(null);
    setActiveActivity(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeActivity ? (
          <ActivityCard
            activity={activeActivity}
            onEdit={() => {}}
            onDelete={() => {}}
            onComplete={() => {}}
            isDragging={true}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// Export sortable context and strategy for use in child components
export { SortableContext, verticalListSortingStrategy };
