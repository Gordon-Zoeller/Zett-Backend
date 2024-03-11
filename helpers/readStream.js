import stream from "stream";

export const readStream = (res, product) => {
    const ReadStream = stream.Readable.from(product);
    ReadStream.pipe(res);
};