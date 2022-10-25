<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\RequiredIf;
use Symfony\Component\CssSelector\XPath\Extension\FunctionExtension;

class FormController extends Controller
{
    public function postForm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required',
            "slug" => array('required', 'unique:forms', 'regex:/([a-z.-])$/i'),
            "allowed_domains" => 'array',
        ]);
        if ($validator->fails()) {
            return response([
                'message' => "Invalid field",
                'error' => $validator->getMessageBag()
            ], 422);
        }
        $user = $request->user();
        $form = $user->forms()->create([
            "name" => $request->name,
            "slug" => $request->slug,
            "description" => $request->description,
            "limit_one_response" => $request->limit_one_response,
        ]);

        return response([
            "message" => "Create form success",
            "form" => $form
        ], 200);
    }
    public function getAllForm(Request $request)
    {
        $user = $request->user();
        $forms = $user->forms()->get();
        return response([
            "message" => "Get all forms success",
            "forms" => $forms
        ], 200);
    }
    public function getDetailForm(Request $request, $slug)
    {
        $user = $request->user();
        $form = Form::where(['slug' => $slug])->get()->first();
        if (!$form) {
            return response([
                "message" => "Form not found"
            ], 404);
        }
        $form->load(['allowedDomains', 'questions']);
        $allowed = false;
        foreach ($form->allowed_domains as $domain) {
            if ($user->email == $domain) $allowed = true;
        }
        if (!$allowed) {
            return response([
                "message" => "Forbidden access"
            ], 403);
        }
        return response([
            "message" => "Get form success",
            "form" => $form
        ], 200);
    }

    /**
     * Question
     */

    public function postQuestion(Request $request, $slug){
        $validator = Validator::make($request->all(),[
            'name'=>"required"
        ]);
        if($validator->fails()){
            return response([
                "message"=>"Invalid Field",
                "error"=>$validator->getMessageBag()
            ]);
        }
        $user = $request->user();
        $form = Form::where('slug', $slug)->get()->first();
        if($user->id != $form->creator_id){
            return response([
                "message"=>"Forbidden access"
            ], 403);
        }
    
    }
}
