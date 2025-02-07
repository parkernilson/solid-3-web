export interface UpdateProfileImageResponse {
    imageUrl: string;
}

export interface ProfileService {
    updateProfileImage(userId: string, file: Blob): Promise<UpdateProfileImageResponse>;
}