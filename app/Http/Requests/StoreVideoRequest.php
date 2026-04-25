<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVideoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('videos.create') ?? false;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'video_source' => ['required', 'in:upload,link'],
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:5000'],
            'visibility' => ['required', 'in:private,unlisted,public'],
            'youtube_url' => ['nullable', 'url', 'max:500', 'required_if:video_source,link'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm', 'max:512000', 'required_if:video_source,upload'],
        ];
    }
}
