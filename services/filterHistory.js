export default function filterHistory(content) {
  // نمر على الرسائل بالتعديل المباشر (دون نسخ)
  for (let i = 0; i < content.length; i++) {
    const message = content[i];

    // إذا parts موجودة، نمر عليها
    if (Array.isArray(message.parts)) {
      for (let j = 0; j < message.parts.length; j++) {
        const part = message.parts[j];

        if (part.fileData && part.fileData.more) {
          delete part.fileData.more;  // حذف مباشرة
        }
      }
    }

    // حذف serching مباشرة لو موجودة
    if (message.serching) {
      delete message.serching;
    }
  }

  return content;  // نرجع نفس المصفوفة مع التعديلات
}

