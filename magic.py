import pytesseract
from googletrans.constants import LANGUAGES
from googletrans import Translator


trans = Translator()


async def translate(src, input, dest) -> str:
    return trans.translate(src=src, dest=dest, text=input)


async def image_to_text(img) -> str:
    text = pytesseract.image_to_string(img)
    return text


async def define_lang_translate(text: str, output_lang) -> str:
    define = trans.detect(str)
    result = await translate(src=define.lang, input=text, dest=output_lang)
    return result


async def all_languages():
    return LANGUAGES


if __name__ == "__main__":
    ...
