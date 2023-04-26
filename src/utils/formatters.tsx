export const entryContent = (body: string) => {
  if (body) {
    let cleanBody = body.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ");
    if (cleanBody.length > 40) {
      cleanBody = cleanBody.slice(0, 40) + "...";
    }
    return cleanBody;
  }
};
