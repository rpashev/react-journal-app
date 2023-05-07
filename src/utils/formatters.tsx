export const entryContent = (body: string) => {
  if (body) {
    let cleanBody = body.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ");
    if (cleanBody.length > 40) {
      cleanBody = cleanBody.slice(0, 40) + "...";
    }
    return cleanBody;
  }
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
  return formattedDate;
};
