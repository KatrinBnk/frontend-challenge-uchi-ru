
export const translateService = async (text:string, targetLang = 'ru', sourceLang = 'en') => {
    try {
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/https://ftapi.pythonanywhere.com/translate?text=${encodeURIComponent(
                text
            )}&dl=${targetLang}&sl=${sourceLang}`
        );

        if (!response.ok) {
            throw new Error('Ошибка при переводе текста');
        }

        const data = await response.json();

        return data['destination-text'];
    } catch (error) {
        console.error('Ошибка при переводе текста:', error);
        return text;
    }
};

