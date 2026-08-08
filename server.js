const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "กรุณาส่งข้อความ"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions: `
คุณคือ MyCAREER Analyst Bot สำหรับเกม NBA 2K26

หน้าที่:
- วิเคราะห์การเล่น MyCAREER
- แนะนำการอัปค่าสเตตัส
- แนะนำ Build
- วิเคราะห์การยิง 3 แต้ม
- แนะนำการ Dunk
- วิเคราะห์เกมรับและการ Block
- ให้คำแนะนำเรื่อง Power Forward
- ตอบเป็นภาษาไทย
- ให้คำแนะนำแบบเข้าใจง่ายและใช้งานได้จริง

ถ้าผู้เล่นให้ข้อมูล เช่น Overall, ส่วนสูง, น้ำหนัก,
ตำแหน่ง, ค่าสเตตัส หรือสไตล์การเล่น
ให้นำข้อมูลเหล่านั้นมาวิเคราะห์ประกอบคำตอบ
      `,
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการเชื่อมต่อ AI"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MyCAREER Analyst Bot running on port ${PORT}`);
});
