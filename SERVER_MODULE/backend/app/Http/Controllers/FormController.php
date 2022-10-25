<?php

namespace App\Http\Controllers;

use App\Models\AllowedDomain;
use App\Models\Form;
use App\Models\Question;
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
        $user_domain = explode('@', $user->email)[1];

        foreach ($form->allowedDomains as $domain) {
            if ($user_domain == $domain->domain) $allowed = true;
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

    public function postQuestion(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'name' => "required",
            "choice_type" => 'required',
            "choices" => "required"
        ]);
        if ($validator->fails()) {
            return response([
                "message" => "Invalid Field",
                "error" => $validator->getMessageBag()
            ]);
        }
        $user = $request->user();
        $form = Form::where(['slug' => $slug])->get()->first();
        if (!$form) {
            return response([
                "message" => "Form not found"
            ], 404);
        }
        if ($user->id != $form->creator_id) {
            return response([
                "message" => "Forbidden access"
            ], 403);
        }
        $joinedArr = null;
        if (is_array($request->choices)) $joinedArr = join(',', $request->choices);
        $question = Question::create([
            "name" => $request->name,
            "choice_type" => $request->choice_type,
            "choices" => $joinedArr ?? $request->choices,
            "is_required" => $request->is_required
        ]);

        return response([
            "message" => "Add question success",
            "question" => $question
        ], 200);
    }
    public function deleteQuestion(Request $request, $slug, $question_id)
    {
        $user = $request->user();
        $form = Form::where(['slug' => $slug])->get()->first();
        if (!$form) {
            return response([
                "message" => "Form not found"
            ], 404);
        }
        if ($user->id != $form->creator_id) {
            return response([
                "message" => "Forbidden access"
            ], 403);
        }
        $questionQ = Question::where(['form_id' => $form->id, "id" => $question_id]);
        $question = $questionQ->get()->first();
        if (!$question) {
            return response([
                "message" => "Question not found"
            ], 404);
        }
        $questionQ->delete();
        return response([
            "message" => "Remove question success"
        ], 200);
    }

    /**
     * Response
     */

    public function postResponse(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'answers' => 'required|array'
            // 'value'=>RequiredIf::class
        ]);
        if ($validator->fails()) {
            return response([
                "message" => "Invalid field",
                "errors" => $validator->getMessageBag()
            ], 422);
        }
        $user = $request->user();
        $domain = explode('@', $user->email)[1];
        $form = Form::where(['slug' => $slug])->with('allowedDomains')->get()->first();

        return $form->allowed_domains;
    }
}
