const getTranslation = (translation, key) => {
    if (!translation) return ''
    return translation?.find((e) => e.column_name === key)?.text
}

export { getTranslation }