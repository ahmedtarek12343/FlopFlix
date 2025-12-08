"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useAddReview } from "@/lib/mutations/useAddReview";
import { toast } from "sonner";
const MovieAddReview = ({
  open,
  onOpenChange,
  movieId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movieId: number;
}) => {
  const [formData, setFormData] = useState({
    content: "",
    rating: 1,
  });

  const { mutate, isPending } = useAddReview();

  const handleSubmit = () => {
    if (!formData.content) {
      toast.error("Review content is required");
      return;
    }
    mutate({
      ...formData,
      movieId,
    });
    onOpenChange(false);
    setFormData({
      content: "",
      rating: 1,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>Add your review</DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Write your review"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
        ></Textarea>
        Rating (10):
        <Select
          onValueChange={(value) =>
            setFormData({ ...formData, rating: Number(value) })
          }
          value={String(formData.rating)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 10 }).map((_, index) => (
                <SelectItem key={index} value={String(index + 1)}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={handleSubmit}>
            {isPending ? "Adding..." : "Add Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MovieAddReview;
