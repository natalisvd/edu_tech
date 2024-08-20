export const resizeImage = (
  file: File,
  maxWidth: number = 300,
  maxHeight: number = 300
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Calculate the new dimensions of the image
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          } else {
            reject(new Error("Failed to resize image"));
          }
        },
        file.type,
        1
      );
    };

    img.onerror = (error) => reject(error);
  });
};

export const getAvatarUrl = (filename: string | null | undefined) => {
  if (!filename) return 'null';
  const baseUrl = process.env.NEXT_PUBLIC_AVATAR_URL;
  return `${baseUrl}/${filename}`
};