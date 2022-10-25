<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
    public function allowedDomains()
    {
        return $this->hasMany(AllowedDomain::class);
    }
    public function responses()
    {
        return $this->hasMany(Response::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'creator_id', 'id');
    }
}
