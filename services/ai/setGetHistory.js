import History from "../../models/History.js";

export default async function setGetHistory(content, userId, historyId) {
    try {
        if (historyId) {
            if (content?.role) {
                return await History.findByIdAndUpdate(historyId, {
                    $push: { messages: content }
                }, { new: true });

            } else {
                return await History.findById(historyId)
            }
        } else {
            return await History.create({
                userId,
                title: 'new chat',
                messages: [content]
            });
        };

    } catch (error) {
        console.error(error);
        throw error;
    };
};




