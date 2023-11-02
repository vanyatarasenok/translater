const fromLanguageSelect = document.getElementById('fromLanguage');
const toLanguageSelect = document.getElementById('toLanguage');
const inputText = document.getElementById('input-text');
const translateButton = document.getElementById('translate-button');
const translateImageButton = document.getElementById('translate-image-button');
const outputText = document.getElementById('output-text');




// Запрос на отоборажение списка языков в выпадающих списках.
fetch('http://localhost:8000/all_languages')
    .then(response =>
    {
        if (!response.ok)
        {throw new Error('Network response was not ok');}

        return response.json();
    })
    .then(data =>
    {
        if (typeof data === 'object')
        {
            for (const key in data)
            {
                if (data.hasOwnProperty(key))
                {
                    const fromOption = document.createElement('option');
                    fromOption.value = key;
                    fromOption.textContent = data[key];
                    fromLanguageSelect.appendChild(fromOption);

                    const toOption = document.createElement('option');
                    toOption.value = key;
                    toOption.textContent = data[key];
                    toLanguageSelect.appendChild(toOption);
                }
            }
        }
        else
        {console.error('Данные не являются объектом:', data);}
    })
    .catch(error =>
    {console.error('Произошла ошибка:', error);});




// Запрос на перевод со считыванием текста и считыванием языков (не работает).
function translateText()
{
    const fromLanguage = fromLanguageSelect.value;
    const toLanguage = toLanguageSelect.value;
    const textToTranslate = inputText.value;

    fetch('http://localhost:8000/translate',
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json', },
        body: JSON.stringify({
            fromLanguage,
            toLanguage,
            text: textToTranslate,
        }),
    })
        .then(response =>
        {
            if (!response.ok)
            {throw new Error('Network response was not ok');}

            return response.json();
        })
        .then(data =>
        {outputText.textContent = data.translation;})
        .catch(error =>
        {console.error('Произошла ошибка при переводе:', error);});
}

// Добавляем обработчик события на кнопку "Перевести"
translateButton.addEventListener('click', translateText);