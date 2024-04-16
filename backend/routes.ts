import express from "express";
import { supabase } from "./db";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("url_mappings").select("*");
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: (error as Error).message || "An unknown error occurred" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { custom_url, destination_url, user_id } = req.body;

    const requestData = [
      {
        custom_url: custom_url ?? null,
        destination_url: destination_url,
        user_id: user_id ?? null,
      },
    ];

    const { data, error } = await supabase
      .from("url_mappings")
      .insert(requestData)
      .select("*");

    if (error) {
      throw error;
    }

    const insertedData = data[0];

    res.json({ message: "Data inserted successfully", data: insertedData });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: (error as Error).message || "An unknown error occurred" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Missing user_id in request body" });
    }

    const { data, error } = await supabase
      .from("url_mappings")
      .update({ user_id })
      .eq("id", id)
      .select("*");

    if (error) {
      throw error;
    }

    const updatedData = data[0];

    if (!updatedData) {
      return res.status(404).json({ error: "URL mapping not found" });
    }

    res.json({ message: "Data updated successfully", data: updatedData });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: (error as Error).message || "An unknown error occurred" });
  }
});
