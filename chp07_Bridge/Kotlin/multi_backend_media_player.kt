// Step 1: Define the Implementor interface
interface MediaBackend {
    fun play(mediaFile: String)
    fun stop()
}

// Step 2: Concrete Implementors
class ExoPlayerBackend : MediaBackend {
    override fun play(mediaFile: String) {
        println("Playing '$mediaFile' using ExoPlayer backend.")
    }

    override fun stop() {
        println("Stopping playback in ExoPlayer.")
    }
}

class AndroidMediaPlayerBackend : MediaBackend {
    override fun play(mediaFile: String) {
        println("Playing '$mediaFile' using Android MediaPlayer backend.")
    }

    override fun stop() {
        println("Stopping playback in Android MediaPlayer.")
    }
}

// Step 3: Define the Abstraction
abstract class MediaPlayerController(protected val backend: MediaBackend) {
    abstract fun startPlayback(mediaFile: String)
    abstract fun stopPlayback()
}

// Step 4: Refined Abstractions
class BasicMediaPlayer(backend: MediaBackend) : MediaPlayerController(backend) {
    override fun startPlayback(mediaFile: String) {
        backend.play(mediaFile)
    }

    override fun stopPlayback() {
        backend.stop()
    }
}

class AdvancedMediaPlayer(backend: MediaBackend) : MediaPlayerController(backend) {
    override fun startPlayback(mediaFile: String) {
        println("Advanced setup before playback.")
        backend.play(mediaFile)
    }

    override fun stopPlayback() {
        println("Advanced cleanup after playback.")
        backend.stop()
    }
}

// Step 5 & 6: Client code
fun main() {
    val exoPlayer = ExoPlayerBackend()
    val androidPlayer = AndroidMediaPlayerBackend()

    val basicPlayer = BasicMediaPlayer(exoPlayer)
    val advancedPlayer = AdvancedMediaPlayer(androidPlayer)

    basicPlayer.startPlayback("song.mp3")
    basicPlayer.stopPlayback()

    advancedPlayer.startPlayback("video.mp4")
    advancedPlayer.stopPlayback()
}