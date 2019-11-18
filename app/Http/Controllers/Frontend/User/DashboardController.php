<?php

namespace App\Http\Controllers\Frontend\User;

use Auth;
use App\Models\Auth\User;
use App\Http\Controllers\Controller;
use App\Events\Frontend\AnalysisDataCreated;

/**
 * Class DashboardController.
 */
class DashboardController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('frontend.user.dashboard');
    }

    public function testAnalysis()
    {
        $randStr = 'tasty';
        $user = Auth::user();
        broadcast(new AnalysisDataCreated($user, $randStr));

        return $randStr;
    }
}
