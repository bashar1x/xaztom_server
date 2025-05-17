import History from "../../models/History.js";

export default async function setGetHistory(content, userId, historyId) {
    try {
        const result = await History.findByIdAndUpdate(historyId, {
            $push: { messages: content }
        }, { new: true });
        if (result) return result;

        return await createNewChat(userId, content);
    } catch (error) {
        console.error(error);
        throw error;
    };
};

const createNewChat = async (userId, content) => {
    console.log('createNewChat');
    
    return await History.create({
        userId,
        title: 'new chat',
        messages: [content]
    });
};


