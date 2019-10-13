@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('navs.general.home'))

@section('content')
<section id="room_index">
    <div class="card text-center">
        <div class="card-body">
            <a href="{{ route('frontend.rooms.create') }}" type="button" class="btn btn-outline-dark">@lang('strings.frontend.room_index.create_room')</a>
            <a href="{{ route('frontend.rooms.login') }}" type="button" class="btn btn-outline-dark">@lang('strings.frontend.room_index.login_room')</a>
        </div>
    </div>
</section>
@endsection
