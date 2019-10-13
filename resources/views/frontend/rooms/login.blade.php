@extends('frontend.layouts.app')

@section('content')
<section id="room_login">
    <div class="card text-center">
        <div class="card-body">
            <form method="POST" action="">
                @csrf
                <div class="list-group">
                    <h4>進入遊戲房</h4>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-secondary active">
                                    <input disabled type="checkbox" checked autocomplete="off"> Pin碼
                                </label>
                            </div>
                        </div>
                        <input name="pin_code" type="text" value='' class="form-control"
                            aria-label="Text input with checkbox">
                    </div>
                </div>

                <button type="submit" class="btn btn-lg btn-primary btn-block">進入房間</button>
            </form>
        </div>
    </div>
</section>
@endsection