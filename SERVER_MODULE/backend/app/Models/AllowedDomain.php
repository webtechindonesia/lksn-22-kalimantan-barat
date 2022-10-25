<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllowedDomain extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];
    public function form()
    {
        return $this->belongsTo(Form::class);
    }
}
