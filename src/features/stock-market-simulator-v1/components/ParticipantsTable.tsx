import { For } from "solid-js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useModel } from "./Provider";

export const ParticipantsTable = () => {
  const state = useModel().state;

  return (
    <div class="p-4 max-w-lg mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="text-center">ID</TableHead>
            <TableHead class="text-center">現金(¥)</TableHead>
            <TableHead class="text-center">保有株数</TableHead>
            <TableHead class="text-center">総資産額(¥)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={Array.from(state.participants.values())}>
            {(p) => (
              <TableRow class="text-center">
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.cash}</TableCell>
                <TableCell>{p.holdings}</TableCell>
                <TableCell>{p.totalAssets}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </div>
  );
};
