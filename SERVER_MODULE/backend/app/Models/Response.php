<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function answers(){
        return $this->hasMany(Answer::class);
    }
    public function form(){
        return $this->belongsTo(Form::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
