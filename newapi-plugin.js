// ePhone AI unified async task plugin for new-api.
// Upstream contract: https://docs.rixapi.com/docs/en/guides/task
//   submit  POST {baseUrl}/v1/task/submit  {model, input}      -> {id, status, created_at}
//   query   GET  {baseUrl}/v1/task/{id}                        -> {id, status, created_at, completed_at?, outputs?, usage?, error?}
export const meta = {
  apiVersion: 1,
  key: "ephone",
  name: "ePhone AI 通用异步任务",
  icon: "text:eP",
  description: {
    en: "ePhone AI unified async task API for video, image, and music generation",
    zh: "ePhone AI 通用异步任务接口，覆盖视频、图像与音乐生成",
  },
  version: "1.0.0",
  author: { name: "RixAPI", url: "https://ephone.ai" },
  website: "https://platform.ephone.ai",
  baseUrl: "https://api.ephone.ai",
  fetchMode: "per_task",
  usageSchema: {
    // Results this call produces. Estimated from the request, then replaced by
    // the delivered output count. Most ePhone AI models bill per call, where
    // this stays 1 and the expression reduces to its flat unit price.
    outputs: {
      type: "number",
      unit: "count",
      description: { en: "Generated result unit price", zh: "生成结果单价" },
    },
    // Upstream usage.type "duration": measured output length in seconds.
    seconds: {
      type: "number",
      unit: "second",
      description: { en: "Duration-billed task unit price", zh: "按时长计费任务单价" },
    },
    // Upstream usage.type "tokens": input side of the token report.
    input_tokens: {
      type: "number",
      unit: "token",
      description: { en: "Input token unit price", zh: "输入 token 单价" },
    },
    // Upstream usage.type "tokens": output side of the token report.
    output_tokens: {
      type: "number",
      unit: "token",
      description: { en: "Output token unit price", zh: "输出 token 单价" },
    },
  },
  // Per-call models report no upstream usage; they settle on outputs alone.
  usageExamples: [
    { label: "per-call", facts: { outputs: 1, seconds: 0, input_tokens: 0, output_tokens: 0 } },
    { label: "per-call · 4 results", facts: { outputs: 4, seconds: 0, input_tokens: 0, output_tokens: 0 } },
    { label: "duration 27s", facts: { outputs: 1, seconds: 27, input_tokens: 0, output_tokens: 0 } },
    { label: "tokens 14 in · 45 out", facts: { outputs: 1, seconds: 0, input_tokens: 14, output_tokens: 45 } },
  ],
  routes: [
    { method: "POST", path: "/v1/task/submit", type: "submit", decode: "submitTask", render: "taskCreated" },
    { method: "GET", path: "/v1/task/:task_id", type: "query", render: "taskStatus" },
  ],
  models: [
    "MiniMax-H3", "MiniMax-H3-Max", "MiniMax-H3/regeneration", "MiniMax-Hailuo-02", "MiniMax-Hailuo-2.3", "MiniMax-Hailuo-2.3-Fast", "act_two/character",
    "aleph2/video-to-video", "doubao-seedance-2-0-260128", "doubao-seedance-2-0-fast-260128", "doubao-seedance-2-0-mini-260615",
    "doubao-seedance-2-5-260628", "flux-3-video", "flux-tools/erase-v1", "flux-tools/outpainting-v1", "flux-tools/vto-v1", "gen3a_turbo/image-to-video",
    "gen4.5/image-to-video", "gen4.5/text-to-video", "gen4_aleph/video-to-video", "gen4_image/ti-to-image", "gen4_image_turbo/ti-to-image",
    "gen4_turbo/image-to-video", "grok-imagine-image-pro/image-to-image", "grok-imagine-image-pro/text-to-image",
    "grok-imagine-image-quality/image-to-image", "grok-imagine-image-quality/text-to-image", "grok-imagine-image/image-to-image",
    "grok-imagine-image/text-to-image", "grok-imagine-video-1.5-preview/generations", "grok-imagine-video/edits", "grok-imagine-video/extensions",
    "grok-imagine-video/generations", "happyhorse-1.0-i2v", "happyhorse-1.0-r2v", "happyhorse-1.0-t2v", "happyhorse-1.1-i2v", "happyhorse-1.1-r2v",
    "happyhorse-1.1-t2v", "kling-2.5-turbo/image-to-video", "kling-2.5-turbo/text-to-video", "kling-2.6/image-to-video", "kling-2.6/motion-control",
    "kling-2.6/text-to-video", "kling-3.0-omni/omni-video", "kling-3.0-turbo/image-to-video", "kling-3.0-turbo/text-to-video", "kling-3.0/image-to-video",
    "kling-3.0/motion-control", "kling-3.0/text-to-video", "kling-image-o1/omni-image", "kling-o1/omni-video", "kling-solutions/clothing_dupe",
    "kling-solutions/goods_studio", "kling-v1-5/image", "kling-v1-5/image-to-video", "kling-v1-6/image-to-video", "kling-v1-6/multi-image-to-video",
    "kling-v1-6/text-to-video", "kling-v1/image", "kling-v1/image-to-video", "kling-v1/text-to-video", "kling-v2-1-master/image-to-video",
    "kling-v2-1-master/text-to-video", "kling-v2-1/image", "kling-v2-1/image-to-video", "kling-v2-1/multi-image-to-image",
    "kling-v2-5-turbo/image-to-video", "kling-v2-5-turbo/text-to-video", "kling-v2-6/image-to-video", "kling-v2-6/motion-control",
    "kling-v2-6/text-to-video", "kling-v2-master/image-to-video", "kling-v2-master/text-to-video", "kling-v2-new/image", "kling-v2/image",
    "kling-v2/multi-image-to-image", "kling-v3-omni/omni-image", "kling-v3-omni/omni-video", "kling-v3/image", "kling-v3/image-to-video",
    "kling-v3/motion-control", "kling-v3/text-to-video", "kling-video-o1/omni-video", "kling_advanced_lip_sync", "kling_audio_text_to_audio",
    "kling_audio_video_to_audio", "kling_avatar_image2video", "kling_effects", "kling_extend", "kling_motion_control", "kling_multi_elements_add",
    "kling_multi_elements_clear", "kling_multi_elements_delete", "kling_multi_elements_init", "kling_multi_elements_preview",
    "kling_multi_elements_submit", "kling_omni_video", "kling_tts", "kling_video", "luma_fast_video", "luma_relax_extend", "luma_relax_video",
    "luma_video", "luma_video_audio", "luma_video_upscale", "mj_fast_edits", "mj_fast_video", "mj_relax_video", "mj_turbo_video",
    "mureka-7.6/instrumental", "mureka-7.6/song", "mureka-7.6/song-extend", "mureka-7.6/soundtrack", "mureka-8/instrumental", "mureka-8/song",
    "mureka-8/song-extend", "mureka-8/soundtrack", "mureka-9.5/instrumental", "mureka-9.5/song", "mureka-9/instrumental", "mureka-9/song",
    "mureka-9/soundtrack", "mureka-o2/song", "mureka/generate-track", "mureka/lyrics-video", "mureka/podcast", "mureka/song-region-edit",
    "mureka/song-remix", "mureka/song-stem", "mureka/song-transcribe", "mureka/tts", "sora-2", "sora-2-pro", "suno_act_midi", "suno_act_mp4",
    "veo-2.0-generate-001", "veo-3.0-fast-generate-001", "veo-3.0-generate-001", "veo-3.1-fast-generate-preview", "veo-3.1-generate-preview",
    "vidu2.0/image-to-video", "vidu2.0/reference-to-video", "vidu2.0/start-end-to-video", "viduq1-classic/image-to-video",
    "viduq1-classic/start-end-to-video", "viduq1/image-to-video", "viduq1/reference-to-video", "viduq1/start-end-to-video", "viduq1/text-to-video",
    "viduq2-pro-fast/image-to-video", "viduq2-pro-fast/start-end-to-video", "viduq2-pro/image-to-video", "viduq2-pro/multiframe",
    "viduq2-pro/reference-to-video", "viduq2-pro/start-end-to-video", "viduq2-turbo/image-to-video", "viduq2-turbo/multiframe",
    "viduq2-turbo/start-end-to-video", "viduq2/reference-to-video", "viduq2/text-to-video", "viduq3-pro/image-to-video", "viduq3-pro/start-end-to-video",
    "viduq3-pro/text-to-video", "viduq3-turbo/image-to-video", "viduq3-turbo/start-end-to-video", "viduq3-turbo/text-to-video", "wan2.2-i2v-flash",
    "wan2.2-i2v-plus", "wan2.2-kf2v-flash", "wan2.2-t2v-plus", "wan2.5-i2v-preview", "wan2.5-t2v-preview", "wan2.6-i2v", "wan2.6-i2v-flash", "wan2.6-r2v",
    "wan2.6-t2v", "wan3.0-video", "wan3.0-video-prime", "wanx2.1-i2v-plus", "wanx2.1-i2v-turbo", "wanx2.1-kf2v-plus", "wanx2.1-t2v-plus",
    "wanx2.1-t2v-turbo", "wanx2.1-vace-plus",
  ],
};

// The host rejects a "second" usage fact above this bound, so every duration
// that reaches billing is clamped here first.
const MAX_SECONDS = 3600;

// Matching bound for the "count" unit. A request asking for more results than
// this is billed at the bound rather than allowed to inflate the charge.
const MAX_OUTPUTS = 128;

// Upstream task status -> host task status. Anything absent stays UNKNOWN so
// the host counts a poll failure instead of inventing progress.
const UPSTREAM_STATUS = {
  queued: "SUBMITTED",
  in_progress: "IN_PROGRESS",
  completed: "SUCCESS",
  failed: "FAILURE",
};

// Host task status -> the status string ePhone AI clients expect back.
const CLIENT_STATUS = {
  NOT_START: "queued",
  SUBMITTED: "queued",
  QUEUED: "queued",
  IN_PROGRESS: "in_progress",
  SUCCESS: "completed",
  FAILURE: "failed",
};

const VIDEO_EXTENSIONS = ["mp4", "mov", "webm", "m4v", "mkv", "avi"];
const AUDIO_EXTENSIONS = ["mp3", "wav", "flac", "m4a", "aac", "ogg", "opus", "mid", "midi"];
const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif", "bmp", "avif", "tiff", "svg"];

function trimmed(value) {
  return String(value === undefined || value === null ? "" : value).trim();
}

function plainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}

// The persisted snapshot is the latest upstream task body the host parsed.
function snapshot(value) {
  return plainObject(value) || {};
}

function outputList(data) {
  const outputs = snapshot(data).outputs;
  if (!Array.isArray(outputs)) return [];
  const urls = [];
  for (const output of outputs) {
    const url = trimmed(output);
    if (url) urls.push(url);
  }
  return urls;
}

function artifactType(url) {
  const path = trimmed(url).split("?")[0].split("#")[0];
  const dot = path.lastIndexOf(".");
  if (dot < 0) return "file";
  const extension = path.slice(dot + 1).toLowerCase();
  if (VIDEO_EXTENSIONS.includes(extension)) return "video";
  if (AUDIO_EXTENSIONS.includes(extension)) return "audio";
  if (IMAGE_EXTENSIONS.includes(extension)) return "image";
  return "file";
}

function artifactIndex(key) {
  const suffix = trimmed(key).startsWith("output_") ? trimmed(key).slice("output_".length) : "";
  if (!/^\d+$/.test(suffix)) return -1;
  return Number(suffix);
}

// ePhone AI spells the requested length differently per model family, and some
// families send it as a string. A duration we cannot read simply means the
// pre-consume estimate falls back to the expression constant.
function requestedSeconds(input) {
  for (const key of ["duration", "seconds", "duration_seconds", "video_length"]) {
    const seconds = Number(input[key]);
    if (Number.isFinite(seconds) && seconds > 0) return Math.min(seconds, MAX_SECONDS);
  }
  return 0;
}

// How many results the caller asked for, spelled differently per model family.
// Anything unreadable bills as a single result, which is the per-call default.
function requestedOutputs(input) {
  for (const key of ["n", "num_images", "num_outputs", "batch_size", "count"]) {
    const requested = Number(input[key]);
    if (Number.isFinite(requested) && requested >= 1) return Math.min(Math.floor(requested), MAX_OUTPUTS);
  }
  return 1;
}

function submitInput(requestBody) {
  return plainObject(snapshot(requestBody).input) || {};
}

// The client-facing task envelope, identical in shape for submit and query so
// an ePhone AI client sees one contract on both routes.
function taskEnvelope(task) {
  const data = snapshot(task.data);
  const status = CLIENT_STATUS[trimmed(task.status).toUpperCase()] || "queued";
  const envelope = { id: trimmed(task.task_id), status: status };
  const createdAt = Number(task.created_at || data.created_at || 0);
  if (Number.isFinite(createdAt) && createdAt > 0) envelope.created_at = createdAt;
  if (status === "completed" || status === "failed") {
    const completedAt = Number(data.completed_at || task.updated_at || 0);
    if (Number.isFinite(completedAt) && completedAt > 0) envelope.completed_at = completedAt;
  }
  if (status === "completed") {
    const outputs = outputList(data);
    if (outputs.length) envelope.outputs = outputs;
  }
  const usage = plainObject(data.usage);
  if (usage) envelope.usage = usage;
  if (status === "failed") envelope.error = trimmed(data.error) || trimmed(task.fail_reason) || "task failed";
  return envelope;
}

export const native = {
  submitTask(ctx) {
    if (!ctx.body || ctx.body.kind !== "json") throw new Error("a JSON request body is required");
    const request = plainObject(ctx.body.value);
    if (!request) throw new Error("the request body must be a JSON object");
    const model = trimmed(request.model);
    if (!model) throw new Error("model is required");
    if (request.input !== undefined && !plainObject(request.input)) throw new Error("input must be a JSON object");
    // callback_url is deliberately dropped. The gateway polls regardless, but a
    // forwarded callback would reach the caller out of band carrying the
    // upstream task id, which is not the public id this gateway issued.
    return { kind: "submit", model: model, requestBody: { model: model, input: plainObject(request.input) || {} } };
  },
  taskCreated(ctx, task) {
    return taskEnvelope(task);
  },
  taskStatus(ctx, task) {
    return taskEnvelope(task);
  },
  error(ctx, error) {
    return { error: { message: error.message, code: error.code } };
  },
};

export function buildSubmitRequest(ctx) {
  return {
    url: ctx.baseUrl + "/v1/task/submit",
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: "Bearer " + ctx.apiKey },
    body: { model: ctx.upstreamModel || ctx.model, input: submitInput(ctx.requestBody) },
  };
}

export function parseSubmitResponse(ctx, resp) {
  const body = plainObject(resp && resp.body);
  if (!body) throw new Error("the upstream returned an unexpected submit response");
  if (trimmed(body.status) === "failed") throw new Error(trimmed(body.error) || "the upstream rejected the task");
  const taskId = trimmed(body.id);
  if (!taskId) throw new Error("the upstream submit response is missing the task id");
  return { taskId: taskId, taskData: body };
}

export function buildQueryRequest(ctx) {
  return {
    url: ctx.baseUrl + "/v1/task/" + encodeURIComponent(ctx.taskId),
    method: "GET",
    headers: { Accept: "application/json", Authorization: "Bearer " + ctx.apiKey },
  };
}

export function parseTaskResult(ctx, body) {
  const task = plainObject(body);
  if (!task) return { status: "UNKNOWN", reason: "unexpected upstream task response" };
  const status = UPSTREAM_STATUS[trimmed(task.status)];
  if (!status) return { status: "UNKNOWN", reason: "unknown task status: " + trimmed(task.status) };
  const result = { status: status };
  if (status === "FAILURE") result.reason = trimmed(task.error) || "task failed";
  if (status === "SUCCESS") {
    const outputs = outputList(task);
    if (outputs.length) result.url = outputs[0];
  }
  return result;
}

export function extractUsage(ctx) {
  if (ctx.usagePurpose === "billing_ratios") return null;
  const input = submitInput(ctx.requestBody);
  return { outputs: requestedOutputs(input), seconds: requestedSeconds(input), input_tokens: 0, output_tokens: 0 };
}

// Terminal usage is a tagged union, and per-call models send none of it. Facts
// omitted here keep their submission values, so an absent or unreadable report
// leaves the estimate in place.
export function extractUsageOnComplete(_task, taskResult, body) {
  const data = snapshot(body);
  const facts = {};
  if (trimmed(taskResult && taskResult.status).toUpperCase() === "SUCCESS") {
    const delivered = outputList(data).length;
    if (delivered > 0) facts.outputs = Math.min(delivered, MAX_OUTPUTS);
  }
  const usage = plainObject(data.usage);
  if (usage && usage.type === "duration") {
    const seconds = Number(usage.seconds);
    if (Number.isFinite(seconds) && seconds >= 0) facts.seconds = Math.min(seconds, MAX_SECONDS);
  }
  if (usage && usage.type === "tokens") {
    const inputTokens = Number(usage.input_tokens);
    const outputTokens = Number(usage.output_tokens);
    if (Number.isFinite(inputTokens) && inputTokens >= 0) facts.input_tokens = inputTokens;
    if (Number.isFinite(outputTokens) && outputTokens >= 0) facts.output_tokens = outputTokens;
  }
  return Object.keys(facts).length ? facts : null;
}

export function listArtifacts(task) {
  if (trimmed(task.status).toUpperCase() !== "SUCCESS") return [];
  return outputList(task.data).map(function (url, index) {
    return { key: "output_" + index, type: artifactType(url) };
  });
}

export function buildContentRequest(ctx) {
  const outputs = outputList(ctx.data);
  const index = artifactIndex(ctx.artifactKey);
  if (index < 0 || index >= outputs.length) throw new Error("artifact_not_found");
  // Result URLs live on rotating vendor CDNs, so they are fetched without any
  // channel credential and re-checked for SSRF by the host on every redirect.
  return { url: outputs[index], method: ctx.clientRequest.method, credentialless: true };
}
