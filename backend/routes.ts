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
