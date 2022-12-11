export default interface Data<TFrame> {
    frameCount: number;
    fps: number;
    frames: TFrame[];
}

export interface BadAppleFrame<TData> {
    width: number;
    height: number;
    data: TData;
}
