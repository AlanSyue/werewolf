<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Room\Room;
use App\Events\Frontend\RoomJoined;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class RoomsController extends Controller
{
    /**
     * Display a listing of the chat rooms.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rooms = Room::with('users')->paginate(5);
        return view('frontend.rooms.index', compact('rooms'));
    }

    /**
     * Show the form for creating a chat room.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $room = app(Room::class);

        return view('frontend.rooms.create', compact('room'));
    }

    /**
     * Store a newly created room in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        try {
            $room = Room::create([
                'name' => $request->get('name'),
                'description' => $request->get('description')
            ]);

            $request->user()->addRoom($room);
        } catch (Exception $e) {
            Log::error('Exception while creating a chatroom', [
                'file' => $e->getFile(),
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);

            return back()->withInput();
        }

        return redirect()->route('frontend.rooms.index');
    }

    /**
     * Show room with messages
     * 
     * @param mixed $room
     */
    public function show(Room $room)
    {
        $room = $room->load('messages');

        return view('frontend.rooms.show', compact('room'));
    }

    /**
     * Allow user to join chat room
     * 
     * @param Room $room
     * @param \Illuminate\Http\Request $request
     */
    public function join(Room $room, Request $request)
    {
        try {
            $room->join($request->user());

            event(new RoomJoined($request->user(), $room));
        } catch (Exception $e) {
            Log::error('Exception while joining a chat room', [
                'file' => $e->getFile(),
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);

            return back();
        }

        return redirect()->route('frontend.rooms.show', ['room' => $room->id]);
    }
}
