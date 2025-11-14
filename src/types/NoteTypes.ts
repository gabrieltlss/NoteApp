export interface NoteType {
    id: number;
    userId: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
}