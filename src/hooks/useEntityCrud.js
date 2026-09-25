import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";

export default function useEntityCrud(entity) {
  const qc = useQueryClient();
  const key = [entity];
  const query = useQuery({ queryKey: key, queryFn: () => base44.entities[entity].list("-created_date", 500) });
  const invalidate = () => qc.invalidateQueries({ queryKey: key });

  const create = useMutation({ mutationFn: (d) => base44.entities[entity].create(d), onSuccess: invalidate });
  const update = useMutation({ mutationFn: ({ id, data }) => base44.entities[entity].update(id, data), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: (id) => base44.entities[entity].delete(id), onSuccess: invalidate });

  const save = async (record, data) => {
    if (record?.id) await update.mutateAsync({ id: record.id, data });
    else await create.mutateAsync(data);
  };

  return {
    items: query.data || [],
    isLoading: query.isLoading,
    save,
    update,
    remove,
    saving: create.isPending || update.isPending,
  };
}