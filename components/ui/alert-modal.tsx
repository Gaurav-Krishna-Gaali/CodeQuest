import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";

const AlertModal = ({
  body,
  errmodal,
  setErrModal,
}: {
  body: string;
  errmodal: boolean;
  setErrModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={errmodal} onOpenChange={setErrModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">ER!!</DialogTitle>
          <DialogDescription className="text-base">{body}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
