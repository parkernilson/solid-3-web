export interface UpdateProfileImageResponse {
    imagePath: string;
}

export interface ProfileService {
    updateProfileImage(file: Blob): Promise<UpdateProfileImageResponse>;
    getImageUrlFromPath(userId: string, imagePath: string): string;
}