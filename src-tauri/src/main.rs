#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dirs;
use serde::Serialize;

#[derive(Serialize)]
enum DownloadResult {
    Pending,
    Success(String),
    Failed,
}

#[tauri::command]
async fn download_youtube_video(url: String) -> DownloadResult {
    let output_dir = match dirs::download_dir() {
        Some(dir) => {
            println!("下载目录: {}", dir.display());
            dir
        }
        None => {
            return DownloadResult::Failed;
        }
    };

    let output_path = output_dir.join("video.mp4");
    DownloadResult::Success(format!("成功下载到 {}", output_path.display()))
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![download_youtube_video])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
