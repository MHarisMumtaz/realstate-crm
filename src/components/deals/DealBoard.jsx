import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { DEAL_STAGES } from "@/lib/constants";
import { formatAEDCompact } from "@/lib/format";
import DealCard from "@/components/deals/DealCard";

export default function DealBoard({ deals, onMove, onSelect }) {
  const onDragEnd = ({ draggableId, destination, source }) => {
    if (!destination || destination.droppableId === source.droppableId) return;
    onMove(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 lg:mx-0 lg:px-0">
        {DEAL_STAGES.map((stage) => {
          const items = deals.filter((d) => d.stage === stage);
          const total = items.reduce((s, d) => s + (d.value || 0), 0);
          return (
            <div key={stage} className="w-72 shrink-0">
              <div className="mb-3 flex items-baseline justify-between px-1">
                <p className="text-xs uppercase tracking-[0.15em]">{stage} <span className="text-muted-foreground">· {items.length}</span></p>
                <p className="text-[11px] text-muted-foreground">{formatAEDCompact(total)}</p>
              </div>
              <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-[420px] space-y-3 rounded-2xl p-2 transition-colors duration-300 ${snapshot.isDraggingOver ? "bg-gold-light/50" : "bg-muted/60"}`}>
                    {items.map((d, i) => (
                      <Draggable key={d.id} draggableId={d.id} index={i}>
                        {(p, s) => (
                          <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                            <DealCard deal={d} dragging={s.isDragging} onClick={() => onSelect(d)} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}