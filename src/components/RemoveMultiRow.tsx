import { Checkbox } from "@/components/ui/checkbox";
export const RemoveMultiRow = ({ row, table }) => {
  const meta = table.options.meta;
  const deleteRow = () => {
    console.log(table);
  };
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
};
