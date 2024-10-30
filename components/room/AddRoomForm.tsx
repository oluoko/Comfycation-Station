"use client";

import { Hotel, Room } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Image, Loader2, Pencil, PencilLine, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { UploadButton } from "@uploadthing/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AddRoomFormProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogOpen: () => void;
}

const AddRoomForm = ({ hotel, room, handleDialogOpen }: AddRoomFormProps) => {
  const formSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" }),
    description: z
      .string()
      .min(10, { message: "Title must be at least 10 characters long" }),
    bedCount: z.coerce.number().min(1, { message: "Bed count is required" }),
    guestCount: z.coerce
      .number()
      .min(1, { message: "Guest count is required" }),
    bathroomCount: z.coerce
      .number()
      .min(1, { message: "Bathroom count is required" }),
    kingBed: z.coerce.number().min(0),
    queenBed: z.coerce.number().min(0),
    image: z.string().min(1, { message: "Image is required" }),
    breakFastPrice: z.coerce.number().optional(),
    roomPrice: z.coerce.number().min(1, { message: "Room price is required" }),
    roomService: z.boolean().optional(),
    Tv: z.boolean().optional(),
    balcony: z.boolean().optional(),
    freeWifi: z.boolean().optional(),
    cityView: z.boolean().optional(),
    oceanView: z.boolean().optional(),
    forestView: z.boolean().optional(),
    mountainView: z.boolean().optional(),
    airCondition: z.boolean().optional(),
    soundProofed: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      title: "",
      description: "",
      bedCount: 0,
      guestCount: 0,
      bathroomCount: 0,
      kingBed: 0,
      queenBed: 0,
      image: "",
      breakFastPrice: 0,
      roomPrice: 0,
      roomService: false,
      Tv: false,
      balcony: false,
      freeWifi: false,
      cityView: false,
      oceanView: false,
      forestView: false,
      mountainView: false,
      airCondition: false,
      soundProofed: false,
    },
  });

  const [image, setImage] = useState<string | undefined>(room?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image]);

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    if (!imageKey) {
      console.log("No image key found");
    } else {
      console.log("Image Key: ", imageKey);
    }

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast({
            variant: "success",
            description: "Image deleted successfully",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Error deleting image",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (hotel && room) {
      axios
        .patch(`/api/room/${room.id}`, values)
        .then((res) => {
          toast({
            variant: "success",
            description: "Room updated successfully",
          });
          router.refresh();
          setIsLoading(false);
          handleDialogOpen();
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            description: "Error while updating room",
          });
          setIsLoading(false);
        });
    } else {
      if (!hotel) return;
      axios
        .post("/api/room", { ...values, hotelId: hotel.id })
        .then((res) => {
          toast({
            variant: "success",
            description: "Room created successfully",
          });
          router.refresh();
          // reload window
          window.location.reload();
          setIsLoading(false);
          handleDialogOpen();
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            description: "Error while creating room",
          });
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="max-h-[75vh] overflow-y-scroll overflow-x-hidden px-2">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Room Title <span className="text-2xl text-red-600">*</span>
                </FormLabel>
                <FormDescription>Provide a room name.</FormDescription>
                <FormControl>
                  <Input placeholder="Double Room" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-2xl text-red-600">*</span>
                </FormLabel>
                <FormDescription>
                  Provide a description for the room.
                </FormDescription>
                <FormControl>
                  <Textarea placeholder="Room description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <FormLabel>Choose Room Amenities</FormLabel>
            <FormDescription>
              What makes this room a great choice
            </FormDescription>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <FormField
                control={form.control}
                name="roomService"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>24hrs Room Service</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Tv"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>TV</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balcony"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Balcony</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="freeWifi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Free Wifi</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cityView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>City View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oceanView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Ocean View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="forestView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Forest View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mountainView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Mountain View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="airCondition"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Air Condition</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soundProofed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Sound Proofed</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>
                  Upload an Image{" "}
                  <span className="text-2xl text-red-600">*</span>
                </FormLabel>
                <FormDescription>
                  Upload an image of your hotel&apos;s room.
                </FormDescription>
                <FormControl>
                  {image ? (
                    <>
                      <div className="relative max-x-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                        <Image
                          fill
                          src={image}
                          alt="Hotel Image"
                          className="rounded-md object-contain"
                        />
                        <Button
                          onClick={() => handleImageDelete(image)}
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-[-12px] top-0"
                        >
                          {imageIsDeleting ? <Loader2 /> : <XCircle />}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="flex flex-col items-center max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res);
                            setImage(res[0].url);
                            toast({
                              variant: "success",
                              description: "Image uploaded successfully",
                            });
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: "destructive",
                              description: `Error! : ${error.message}`,
                            });
                          }}
                        />
                      </div>
                    </>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-6">
            <div className="flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="roomPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Room Price in USD
                      <span className="text-2xl text-red-600">*</span>
                    </FormLabel>
                    <FormDescription>
                      The price for staying in this room for 24 hours.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bed Count<span className="text-2xl text-red-600">*</span>
                    </FormLabel>
                    <FormDescription>
                      How many beds are available in this room.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Guest Count
                      <span className="text-2xl text-red-600">*</span>
                    </FormLabel>
                    <FormDescription>
                      How many guests are allowed in this room.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathroomCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bathroom Count
                      <span className="text-2xl text-red-600">*</span>
                    </FormLabel>
                    <FormDescription>
                      How many bathrooms are in this room.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="breakFastPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BreakFast Price in USD</FormLabel>
                    <FormDescription>
                      The Breakfast price for this room.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kingBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>King Bed</FormLabel>
                    <FormDescription>
                      How many king beds are available in this room.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="queenBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Queen Bed</FormLabel>
                    <FormDescription>
                      How many queen beds are available in this room.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="pt-4 pb-2">
            {room ? (
              <Button
                className="max-w-[150px]"
                disabled={isLoading}
                type="button"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4" /> Updating...
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-2 h-4 w-4" /> Update
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  className="max-w-[150px]"
                  disabled={isLoading}
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4" /> Creating...
                    </>
                  ) : (
                    <>
                      <Pencil className="mr-2 h-4 w-4" /> Create Room
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRoomForm;
