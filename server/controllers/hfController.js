
// ⚠️ Directly hard-coded API key
const HF_API_TOKEN = "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";

const HF_API_URL = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it";

const hfConfig = prompt => ({
  method: "POST",
  headers: {
    Authorization: `Bearer ${HF_API_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    inputs: [
      { role: "user", content: prompt }
    ],
    parameters: { max_new_tokens: 200 }
  }),
});

export const GenerateTripSummary = async (req, res) => {
  const {
    tripId,
    tripTotal,
    tripType,
    abroadInfo,
    travelType,
    ofGroup,
    tripTitle,
    startOn,
    endsOn,
  } = req.body;

  const prompt = `Write a short, exciting trip summary.
  - Trip Title: ${tripTitle}
  - Trip Type: ${tripType}
  - Travel Style: ${travelType}
  - Group Size: ${ofGroup}
  - Start Date: ${startOn}
  - End Date: ${endsOn}
  - Estimated Cost: ₹${tripTotal}
  If travel style is Solo or Family, don't use group size data.`;

  try {
    const hfRes = await fetch(HF_API_URL, hfConfig(prompt));

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      console.error("HF API error:", errText);
      return res.status(hfRes.status).json({ error: errText });
    }

    const data = await hfRes.json();

    // HuggingFace returns text differently for chat models
    const summary = data.generated_text || data[0]?.generated_text || "No summary generated.";

    res.status(200).json({ summary });
  } catch (err) {
    console.error("AI route error:", err);
    res.status(500).json({ error: "Something went wrong with Hugging Face" });
  }
};