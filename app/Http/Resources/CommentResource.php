<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "author_name" => $this->author_name,
            "author_email" => $this->author_email,
            "content" => $this->content,
            "description" => substr($this->content, 0, 70) . "...",
            "ago" => $this->created_at->diffForHumans()
        ];
    }
}
